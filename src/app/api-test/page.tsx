async function getTest() {
  // http://ts-lee.com/graphql

  return Promise.resolve({message: 'success'});
}

async function ApiTest() {
  const data = await getTest();

  return (
    <div>
      <div>Api Test</div>
    </div>
  )
}

export default ApiTest;