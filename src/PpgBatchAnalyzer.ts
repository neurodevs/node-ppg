export default class PpgBatchAnalyzerImpl implements PpgBatchAnalyzer {
    public static Class?: PpgBatchAnalyzerConstructor

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }
}

export interface PpgBatchAnalyzer {}

export type PpgBatchAnalyzerConstructor = new () => PpgBatchAnalyzer
