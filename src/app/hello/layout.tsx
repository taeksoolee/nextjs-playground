const HelloLayout: React.FC<React.PropsWithChildren<{

}>> = ({children}) => {
  return (
    <div>
      <h1>Hello Page Layout!</h1>
      <div>
        <h2>page</h2>
          { children }
      </div>
    </div>
  )
}

export default HelloLayout;