import handlebars from 'handlebars';

interface ITemplateVariable {
    [key: string]: string | number;
}

export interface IParseMailTemplate {
    template: string;
    variables: ITemplateVariable;
}
export class HandlebarsMailTemplate {
    public async parse({
        template,
        variables,
    }: IParseMailTemplate): Promise<string> {
        const parseTemplate = handlebars.compile(template);

        return parseTemplate(variables);
    }
}
