import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import Header from "./header";
import Head from 'next/head'

export default function Home({ posts }) {
  return (
    <div className="home-main">
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>High on Code - The Lazy Developer Network</title>
        <meta name="title" content="The Cool Stack - The Lazy Developer Network" />
        <meta name="description" content="The Cool Stack. Information, Stories and tips to deal with your inner dumb vulnerabilities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://high-on-code.web.app/" />
        <meta property="og:title" content="The Cool Stack - The Lazy Developer Network" />
        <meta property="og:description" content="The Lazy developer network. Information, Stories and tips to deal with your inner dumb vulnerabilities." />
        <meta property="og:image" content="img/start.png" />
      </Head>
      <Header />
      <div className="cover">
        <h1>The Cool Stack</h1>
        <p>The Lazy developer network. Information, Stories and tips to deal with your inner dumb vulnerabilities.</p>
        <a href="https://codeonec.co">Fly Home</a>
      </div>
      <div className="post-wrapper">
        <h1 className="wrapper-head">Latest</h1>
      </div>
      <div className="post-wrapper" style={{marginBottom: 50 + 'px'}}>
        {posts.map(({ slug, frontmatter: { title, img, description, date } }) => (
          <Link href={`./post/${slug}`}>
            <div className="card">
              {img?<img src={img} className="card-img" ></img>:''}
              <article key={title} className="block">
                <header>
                  {title}
                </header>
                <section>
                  <p>{description}</p>
                </section>
                <footer>{date}</footer>
              </article>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(`${process.cwd()}/content`);

  const posts = files.map((filename) => {
    const markdownWithMetadata = fs
      .readFileSync(`content/${filename}`)
      .toString();

    const { data } = matter(markdownWithMetadata);

    // Convert post date to format: Month day, Year
    const options = { year: "numeric", month: "long", day: "numeric" };
    // const formattedDate = data.date.toLocaleDateString("en-US", options);

    const frontmatter = {
      ...data
      // date: formattedDate,
    };

    return {
      slug: filename.replace(".md", ""),
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
