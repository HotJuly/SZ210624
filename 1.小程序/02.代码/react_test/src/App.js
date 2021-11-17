import React, {Component} from 'react'
class App extends Component{
  state={
    msg:1
  }

  input123=React.createRef();

  handleClick=()=>{
    console.log('msg1',this.state.msg)
    this.setState({
      msg:this.state.msg+1
    })
    console.log('msg2',this.state.msg)
    this.setState({
      msg:this.state.msg+1
    })
    console.log('msg3',this.state.msg)
    this.setState({
      msg:this.state.msg+1
    })
    console.log('msg4',this.state.msg)
  }

  handleClick1=()=>{
    console.log('handleClick1')
  }
  handleClick2=()=>{
    console.log('handleClick2')
  }

  render(){
    return (
      <div>
        <h1>{this.state.msg}</h1>
        {/* <button onClick={this.handleClick}>+1</button> */}
        {/* <button ref={this.input123}>+1</button> */}
        <button ref={this.input123} onClick={this.handleClick1}>+1</button>
      </div>
    )
  }

  componentDidMount(){
    this.input123.current.onclick=this.handleClick2;
  }
}

export default App;
