export default class PpgAnalyzerImpl implements PpgAnalyzer {
    public static Class?: PpgAnalyzerConstructor

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }
}

export interface PpgAnalyzer {}

export type PpgAnalyzerConstructor = new () => PpgAnalyzer
