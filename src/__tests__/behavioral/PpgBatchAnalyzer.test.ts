import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import PpgBatchAnalyzerImpl, { PpgBatchAnalyzer } from '../../PpgBatchAnalyzer'

export default class PpgBatchAnalyzerTest extends AbstractSpruceTest {
    private static instance: PpgBatchAnalyzer

    protected static async beforeEach() {
        await super.beforeEach()
        this.instance = this.PpgBatchAnalyzer()
    }

    @test()
    protected static async canCreatePpgBatchAnalyzer() {
        assert.isTruthy(this.instance)
    }

    private static PpgBatchAnalyzer() {
        return PpgBatchAnalyzerImpl.Create()
    }
}
