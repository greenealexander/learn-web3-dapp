import Head from 'next/head';
import {CHAINS_CONFIG} from 'lib/constants';
import {CHAINS, ChainPropT} from 'types';
import {fetchMarkdownForChainId} from 'utils/markdown';
import WithLayoutTheGraph from 'components/protocols/the_graph';

export async function getStaticProps() {
  return {
    props: {
      chain: CHAINS_CONFIG[CHAINS.THE_GRAPH],
      markdown: fetchMarkdownForChainId(CHAINS.THE_GRAPH),
    },
  };
}

const TheGraph = (props: ChainPropT) => {
  const {chain, markdown} = props;

  return (
    <>
      <Head>
        <title>{`Figment Learn - ${chain.label} Pathway`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithLayoutTheGraph chain={chain} markdown={markdown} />
    </>
  );
};

export default TheGraph;