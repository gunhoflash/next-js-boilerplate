import withLayout from '@components/withLayout';

const Custom404 = () => (
  <>
    <h1>404</h1>
    <p>Page not found</p>
  </>
);

export default withLayout(Custom404, {
  noGNB: true,
  headOptions: {
    title: '404',
    description: 'Page not found',
  },
});
