import { assertOptions } from '@sprucelabs/schema'
import {
    HilbertPeakDetector,
    FirBandpassFilter,
    FirBandpassFilterClass,
    PeakDetector,
    Filter,
    PeakDetectorResults,
} from '@neurodevs/node-signal-processing'

export default class PpgPeakDetectorImpl implements PpgPeakDetector {
    public static Class?: PpgPeakDetectorConstructor

    protected sampleRate: number
    protected filter: Filter
    protected detector: PeakDetector
    protected lowCutoffHz: number
    protected highCutoffHz: number
    protected numTaps: number
    protected attenuation: number

    protected constructor(options: PpgPeakDetectorConstructorOptions) {
        let {
            sampleRate,
            filter,
            detector,
            lowCutoffHz,
            highCutoffHz,
            numTaps,
            attenuation,
        } = assertOptions(options, ['sampleRate'])

        this.sampleRate = sampleRate
        this.filter = filter
        this.detector = detector
        this.lowCutoffHz = lowCutoffHz
        this.highCutoffHz = highCutoffHz
        this.numTaps = numTaps
        this.attenuation = attenuation
    }

    public static Create(options: PpgPeakDetectorOptions) {
        let {
            sampleRate,
            Filter: FilterClass = FirBandpassFilter,
            lowCutoffHz = 0.4,
            highCutoffHz = 4.0,
            numTaps = 4 * Math.floor(sampleRate) + 1,
            attenuation = 50,
        } = assertOptions(options, ['sampleRate'])

        const filter = new FilterClass({
            sampleRate,
            lowCutoffHz,
            highCutoffHz,
            numTaps,
            attenuation,
            usePadding: true,
        })

        const detector = new HilbertPeakDetector()

        return new (this.Class ?? this)({
            sampleRate,
            lowCutoffHz,
            highCutoffHz,
            numTaps,
            attenuation,
            filter,
            detector,
        })
    }

    public run(rawData: number[], timestamps: number[]) {
        const filtered = this.filter.run(rawData)
        const result = this.detector.run(filtered, timestamps)

        return {
            ...result,
            rawData,
        }
    }
}

export interface PpgPeakDetector {}

export type PpgPeakDetectorConstructor = new (
    options: PpgPeakDetectorConstructorOptions
) => PpgPeakDetector

export interface PpgPeakDetectorOptions {
    sampleRate: number
    Filter?: FirBandpassFilterClass
    lowCutoffHz?: number
    highCutoffHz?: number
    numTaps?: number
    attenuation?: number
}

export interface PpgPeakDetectorConstructorOptions {
    sampleRate: number
    filter: Filter
    detector: PeakDetector
    lowCutoffHz: number
    highCutoffHz: number
    numTaps: number
    attenuation: number
}

export interface PpgPeakDetectorResults extends PeakDetectorResults {
    rawData: number[]
}
