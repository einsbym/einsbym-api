interface ApiConfigProps {
    apiUrl: string;
    httpTimeout: number;
}

interface PostgresConfigProps {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

interface GqlConfigProps {
    playground: boolean;
    autoSchemaFile: boolean;
}

export interface ConfigProps {
    port: number;
    api: ApiConfigProps;
    postgres: {
        database: PostgresConfigProps;
    };
    graphql: GqlConfigProps;
}
