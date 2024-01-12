
export const Navbar = () => {
  return (
    <nav className="navbar | bg-secondary color-primary">
      <div className="wrapper">
        <div className="navbar__inner">
          <h2>Chef.AI</h2>
          <div className="menu">
            <a href="/">Home</a>
            {/* <a href="/recipes">Recipes</a> */}
          </div>
        </div>
      </div>
    </nav>
  )
}