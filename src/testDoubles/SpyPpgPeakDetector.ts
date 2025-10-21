import PpgPeakDetectorImpl, {
    PpgPeakDetectorConstructorOptions,
} from '../impl/PpgPeakDetector'

export default class SpyPpgPeakDetector extends PpgPeakDetectorImpl {
    public static constructorHitCount = 0

    public constructor(options: PpgPeakDetectorConstructorOptions) {
        SpyPpgPeakDetector.constructorHitCount += 1
        super(options)
    }

    public getNumTaps() {
        return this.numTaps
    }

    public static clearTestDouble() {
        this.constructorHitCount = 0
    }
}
