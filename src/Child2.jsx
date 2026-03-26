import Child3 from "./Child3"

const Child2 = ({ asda }) => {
  return <>
    Child2
    <Child3 asda={asda} />
  </>
}

export default Child2