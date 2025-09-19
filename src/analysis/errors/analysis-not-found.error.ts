export class AnalysisNotFoundError extends Error {
  constructor(id: string) {
    super(`Analysis with #${id} not found`);
  }

  static create(id: string): AnalysisNotFoundError {
    throw new AnalysisNotFoundError(id);
  }
}
