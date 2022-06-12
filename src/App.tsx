import {MutableRefObject, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import './App.css'
import { Graph,Addon } from '@antv/x6';
const data = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40,       // Number，必选，节点位置的 x 值
      y: 40,       // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'hello', // String，节点标签
      shape: 'ellipse',
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160,      // Number，必选，节点位置的 x 值
      y: 180,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'world', // String，节点标签
    },
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
      shape: 'double-edge',
    },
    {
      source: 'node2', // String，必须，起始节点 id
      target: 'node1', // String，必须，目标节点 id
      shape: 'double-edge',
    }
  ],
};

function App() {
  const ref:MutableRefObject<any> = useRef(null)

  const [graph,setGraph] = useState<any>()

  useEffect(()=>{
    setGraph(new Graph({
      container: ref.current,
      width: 800,
      height: 600,
      background: {
        color: '#fffbe6', // 设置画布背景颜色
      },
      grid: {
        size: 10,      // 网格大小 10px
        visible: true, // 渲染网格背景
      },
      panning: true,
    }))

  },[])

  useEffect(()=>{
    if(!graph)return;
    graph.fromJSON(data)
    graph.centerContent()
  },[graph,data])

  const addPoint = useCallback(()=>{
    const child = graph.addNode({
      x: 120,
      y: 80,
      width: 120,
      height: 60,
      zIndex: 10,
      label: 'Child\n(embedded)',
      attrs: {
        body: {
          fill: 'green',
        },
        label: {
          fill: '#fff',
        },
      },
    })

    const parent = graph.addNode({
      x: 80,
      y: 40,
      width: 320,
      height: 240,
      zIndex: 1,
      label: 'Parent\n(try to move me)',
    })
    parent.addChild(child)


  },[graph])

  return (
    <>
      <div ref={ref}></div>
      <div onClick={addPoint}>addPoint</div>
    </>
  )
}

export default App
