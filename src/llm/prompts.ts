const outputInstruction = `<output_instruction>
Your response should be a json that contains :
'result' - result of the summary
'confidence' - a confidence score ranging from 0 - 1.

Be as thorough as possible in your evaluations. No explanation, no prologue just the json.
</output_instruction>`;

export function getPerformSummaryPrompt(content: string): string {
  return `You are an expert summarizer. Your job is to summarize the following content into a valid json, also ensure to follow the output_instruction.
    <content>
    ${content}
    </content>

    ${outputInstruction}
    `;
}

export function getPerformSentimentAnalysisPropmt(content: string): string {
  return `You are an expert sentiment analyser, analyse the sentiment of the following content:
    <content>
    ${content}
    </content>

    ${outputInstruction}
    `;
}

export function performThemeExtractionPrompt(content: string): string {
  return `You are an expert theme extractor. Extract the theme from the following content:
    <content>
    ${content}
    </content>

    ${outputInstruction}
    `;
}
