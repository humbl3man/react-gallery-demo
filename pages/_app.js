import React from 'react';
import Head from 'next/head';
import App, { Container } from 'next/app';

export default class GalleryDemo extends App {
  render() {
    const { Component } = this.props;
    return (
      <Container>
        <Head>
          <title>React Gallery Demo</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
            integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
            crossOrigin="anonymous"
          />
        </Head>
        <Component />
      </Container>
    );
  }
}
