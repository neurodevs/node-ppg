import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import PpgAnalyzerImpl, { PpgAnalyzer } from '../../PpgAnalyzer'

export default class PpgAnalyzerTest extends AbstractSpruceTest {
    private static instance: PpgAnalyzer

    protected static async beforeEach() {
        await super.beforeEach()
        this.instance = this.PpgAnalyzer()
    }

    @test()
    protected static async canCreatePpgAnalyzer() {
        assert.isTruthy(this.instance)
    }

    private static PpgAnalyzer() {
        return PpgAnalyzerImpl.Create()
    }
}
