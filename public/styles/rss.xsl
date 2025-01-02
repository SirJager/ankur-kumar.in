<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> Web Feed</title>
				<link rel="icon" href="/icons/favicon.ico" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
				<script src="https://cdn.tailwindcss.com?plugins=typography"></script>
			</head>
			<body class="bg-black text-white px-4 mt-40 mb-32 mx-auto max-w-2xl grid place-items-center prose">
			<div>
          <header>
						<h1 class="border-0 text-white font-light text-xl sm:text-4xl md:text-5xl flex items-center gap-4 h-12">
							<img src="/icons/favicon.ico"/>
              <xsl:value-of select="/rss/channel/title"/> | RSS Feed
            </h1>
            <p><xsl:value-of select="/rss/channel/description"/></p>
            <a class="text-white underline" target="_blank">
              <xsl:attribute name="href">
                <xsl:value-of select="/rss/channel/link"/>
              </xsl:attribute>
               <strong>Visit Website &#x2192;</strong>
							</a>
						<nav class="container-md">
						<p class="py-2 text-white mb-1 rounded-full">
							Subscribe by copying the URL from the address bar into your newsreader.
						</p>
					</nav>
				</header>
				<h2 class="border-b-2 border-white/10 text-white text-4xl font-light">Articles</h2>
          <xsl:for-each select="/rss/channel/item">
            <div class="transition-all brightness-50 hover:brightness-110 ease-in-out duration-300">
              <h3>
                <a target="_blank" class="text-white no-underline font-light text-2xl sm:text-3xl">
                  <xsl:attribute name="href">
                    <xsl:value-of select="link"/>
                  </xsl:attribute>
                  <xsl:value-of select="title"/>
                </a>
								</h3>
							<p>
								<xsl:value-of select="description"/>
							</p>
              <small class="text-white text-base">
                Published: <xsl:value-of select="pubDate" />
							</small>
								<ul class="p-0 m-0 flex mt-4 items-center list-none flex-wrap gap-2">
									<xsl:for-each select="category">
										<li class="p-0 m-0">
											<a target="_blank" class="py-2 text-sm px-2 py-0.5 bg-white/10 text-white">
												<xsl:attribute name="href">
													<xsl:choose>
															<xsl:when test="contains(., '#')">
															<xsl:value-of select="concat(/rss/channel/link, 'tags/', translate(., '#', ''))"/>
															</xsl:when>
															<xsl:otherwise>
															<xsl:value-of select="concat(/rss/channel/link, 'categories/', .)"/>
															</xsl:otherwise>
													</xsl:choose>
													</xsl:attribute>
 												<xsl:value-of select="."/>
											</a>
										</li>
									</xsl:for-each>
								</ul>
						</div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
