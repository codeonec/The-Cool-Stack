
import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown/with-html";
import Header from "../header";

export default function Post({ header,content }) {
  return (
    <div className="article-container">
      <Header/>
      <div className="article">
          <div className="header">
            <div className="header-title">{header.title}</div>
            <div className="header-desc">{header.description}</div>
            <div className="header-date">{header.date}</div>
            <div className="header-img">{header.img?<img src={`../${header.img}`} height="100"></img>:''}</div>
          </div>
          <div className="body">
            <ReactMarkdown escapeHtml={false} source={content} />
          </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync("content");

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
   const markdownWithMetadata = fs
    .readFileSync(path.join("content", slug + ".md"))
    .toString();

  const { data, content } = matter(markdownWithMetadata);

  // Convert post date to format: Month day, Year
  // const options = { year: "numeric", month: "long", day: "numeric" };
  // const formattedDate = data.date.toLocaleDateString("en-US", options);

 
  return {
    props: {
      header: data,
      content: content
    },
  };
}

