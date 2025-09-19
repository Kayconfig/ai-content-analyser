export class InvalidAnalysisTypeError extends Error {
  constructor(message: string) {
    super(message);
  }

  static create(invalidAnalysisType: string): InvalidAnalysisTypeError {
    return new InvalidAnalysisTypeError(
      `AnalysisType : '${invalidAnalysisType}' is invalid`,
    );
  }
}
