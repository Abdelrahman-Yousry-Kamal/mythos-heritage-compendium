/**
 * Web Audio API Synthesizer for Authentic Tactile & Museum Sound Effects
 * أصوات نقر الورق المعتق والذخائر البرونزية ونغمة الأثير التراثية دون أي اعتماديات خارجية
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(0, this.ctx?.currentTime || 0);
    } else if (!this.isMuted && this.ambientGain && this.isAmbientPlaying) {
      this.ambientGain.gain.setValueAtTime(0.04, this.ctx?.currentTime || 0);
    }
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  /**
   * صوت تقليب ورق البردي المعتق (Tactile Parchment Turn)
   */
  public playPageTurn() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Brown noise simulation for paper texture
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  /**
   * رنين اكتشاف أثر أو ذخيرة برونزية (Brass Relic Unlock Chime)
   */
  public playRelicUnlock() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const frequencies = [587.33, 880, 1174.66]; // D5, A5, D6 harmonic chime
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.85);
      });
    } catch {
      // Audio fallback
    }
  }

  /**
   * وقع ختم القرار الأسطوري (Decision Stamp Thump)
   */
  public playDecisionStamp() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {
      // Audio fallback
    }
  }

  /**
   * تشغيل أو إيقاف نغمة الأثير المتحفية الهادئة (Ambient Museum Drone)
   */
  public toggleAmbientMusic(): boolean {
    const ctx = this.getContext();
    if (!ctx) return false;

    if (this.isAmbientPlaying) {
      if (this.ambientOsc) {
        try {
          this.ambientGain?.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
          setTimeout(() => {
            this.ambientOsc?.stop();
            this.ambientOsc?.disconnect();
            this.ambientOsc = null;
            this.ambientGain = null;
          }, 500);
        } catch {
          // Ignore
        }
      }
      this.isAmbientPlaying = false;
      return false;
    } else {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // 216Hz - Ancient harmonic meditative root frequency (A432 subharmonic)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(216, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.035, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        this.ambientOsc = osc;
        this.ambientGain = gain;
        this.isAmbientPlaying = true;
        return true;
      } catch {
        return false;
      }
    }
  }

  public getAmbientState(): boolean {
    return this.isAmbientPlaying;
  }
}

export const sounds = new SoundManager();

