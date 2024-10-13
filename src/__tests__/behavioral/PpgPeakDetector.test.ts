import { randomInt } from 'crypto'
import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
} from '@sprucelabs/test-utils'
import { SpyFirBandpassFilter } from '@neurodevs/node-signal-processing'
import PpgPeakDetectorImpl, {
    PpgPeakDetectorOptions,
} from '../../PpgPeakDetector'
import SpyPpgPeakDetector from '../../testDoubles/SpyPpgPeakDetector'

export default class PpgPeakDetectorTest extends AbstractSpruceTest {
    private static detector: SpyPpgPeakDetector
    private static options: PpgPeakDetectorOptions
    private static rawData = [1, 2, 3, 4]
    private static timestamps = [4, 5, 6, 7]

    protected static async beforeEach() {
        PpgPeakDetectorImpl.Class = SpyPpgPeakDetector
        SpyPpgPeakDetector.clearTestDouble()
        SpyFirBandpassFilter.clear()

        this.options = this.generateRandomOptions()
        this.detector = this.Detector()
    }

    @test()
    protected static async throwsWithMissingRequiredOptions() {
        // @ts-ignore
        const err = assert.doesThrow(() => new PpgPeakDetectorImpl())

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['sampleRate'],
        })
    }

    @test('works with sampleRate: 100, numTaps: 401', 100, 401)
    @test('works with sampleRate: 100.5, numTaps: 401', 100.5, 401)
    protected static async numTapsEqualsSampleRateTimesFourPlusOne(
        sampleRate: number,
        expectedNumTaps: number
    ) {
        const detector = this.Detector({ sampleRate })
        assert.isEqual(detector.getNumTaps(), expectedNumTaps)
    }

    @test()
    protected static async runCallsDependenciesAsExpected() {
        this.run()
        assert.isEqual(SpyFirBandpassFilter.runHitCount, 1)
    }

    private static generateRandomOptions() {
        return {
            sampleRate: 100 * Math.random(),
            Filter: SpyFirBandpassFilter,
            lowCutoffHz: randomInt(1, 5) * Math.random(),
            highCutoffHz: 10 + randomInt(1, 5) * Math.random(),
            attenuation: 100 * Math.random(),
        }
    }

    private static run() {
        return this.detector.run(this.rawData, this.timestamps)
    }

    private static Detector(options?: Partial<PpgPeakDetectorOptions>) {
        return PpgPeakDetectorImpl.Create({
            ...this.options,
            ...options,
        }) as SpyPpgPeakDetector
    }
}
