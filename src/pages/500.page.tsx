import withLayout from '@components/withLayout';

const Custom500 = () => (
  <>
    <h1>500</h1>
    <p>Internal server error</p>
  </>
);

export default withLayout(Custom500, {
  noGNB: true,
  headOptions: {
    title: '500',
    description: 'Internal server error',
  },
});
