import type { JestConfigWithTsJest } from "ts-jest";
import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

const jestConfig: JestConfigWithTsJest = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>"],
    testRegex: "..spec.ts$",
    transform: {
        "^.+.(t|j)s$": "ts-jest",
    },
    collectCoverageFrom: ["**/.(t|j)s"],
    coverageDirectory: "../coverage",
    moduleFileExtensions: ["js", "json", "ts"],
    modulePaths: [compilerOptions.baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    setupFiles: ["./jest.setup.ts"],
};

export default jestConfig;
