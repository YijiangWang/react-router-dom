import RouteUse from "./pages/RouteUse";
import YJRouteUse from "./pages/YJRouteUse";


// 正常情况下，Provider 包裹根目录下的所有内容；这里为了作比较，进行了分别包裹
function App() {
  return (
    <div className="App">
      App
      {/* <RouteUse /> */}
      <YJRouteUse />
    </div>
  );
}

export default App;
