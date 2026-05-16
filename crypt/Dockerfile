FROM rust:1.88-slim-bullseye AS builder

WORKDIR /app

# System Dependence
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    curl \
    ca-certificates \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Android NDK
ENV NDK_VERSION=r25c
RUN curl -o android-ndk.zip https://dl.google.com/android/repository/android-ndk-${NDK_VERSION}-linux.zip && \
    unzip -q android-ndk.zip -d /opt/ && \
    rm android-ndk.zip

ENV ANDROID_NDK_HOME=/opt/android-ndk-${NDK_VERSION}

# Rust Cross Build Target
RUN rustup target add aarch64-linux-android

# Install Build Tools
RUN cargo install cargo-ndk
