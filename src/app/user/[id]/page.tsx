export default function UserDetail(context: {
  params: { id: number },
  searchParams: {},
}) {
  console.log(context.params.id);
  return (
    <div>
      <h2>User Detail</h2>
      <div></div>
    </div>
  )
}