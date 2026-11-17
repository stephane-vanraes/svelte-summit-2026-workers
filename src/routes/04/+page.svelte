<main>
	<h1>Server <span class="blue under">configuration</span></h1>
	<code
		><pre>
<p>server.middlewares.use((req, res, next) =&gt; &lcub;</p>
<p>&nbsp;&nbsp;res.setHeader(<span class="red bold"
					>'Cross-Origin-Opener-Policy', 'same-origin'</span
				>);</p>
<p>&nbsp;&nbsp;res.setHeader(<span class="red bold"
					>'Cross-Origin-Embedder-Policy', 'require-corp'</span
				>);</p>
<p>&nbsp;&nbsp;next();</p>
<p>&rcub;);</p>
</pre></code
	>
	<span>(or the equivalent for your server)</span>
</main>

<style>
	code {
		background-color: white;
		font-family: monospace;
		font-size: 1rem;
		inline-size: max-content;
		inset: 50%;
		opacity: 1;
		padding: 1rem 4rem 1rem 1rem;
	}
</style>
