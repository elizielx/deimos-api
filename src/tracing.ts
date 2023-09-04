import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { FastifyInstrumentation } from "@opentelemetry/instrumentation-fastify";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { NestInstrumentation } from "@opentelemetry/instrumentation-nestjs-core";
import { Resource } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

const traceExporter = new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces",
});

export const otelSDK = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: `deimos-api-otel`,
        [SemanticResourceAttributes.SERVICE_VERSION]: process.env.npm_package_version ?? "0.0.0",
        env: process.env.NODE_ENV || "",
    }),
    spanProcessor: new BatchSpanProcessor(traceExporter),
    instrumentations: [new HttpInstrumentation(), new FastifyInstrumentation(), new NestInstrumentation()],
});

process.on("SIGTERM", () => {
    otelSDK
        .shutdown()
        .then(
            () => console.log("SDK shut down successfully"),
            (err) => console.log("Error shutting down SDK", err)
        )
        .finally(() => process.exit(0));
});
