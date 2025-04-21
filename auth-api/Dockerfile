FROM golang:1.24-alpine as builder
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o auth-api

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/auth-api .
EXPOSE 8000
CMD ["./auth-api"]
