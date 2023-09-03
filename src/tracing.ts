import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
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
    instrumentations: [getNodeAutoInstrumentations()],
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
