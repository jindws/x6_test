import {Addon, Graph,Dom} from '@antv/x6'
import {MutableRefObject, useEffect, useRef, useState} from "react";


function Test() {
    const ref:MutableRefObject<any> = useRef(null)
    const [graph,setGraph] = useState<any>()
    const [dnd,setDnd] = useState<any>()

    useEffect(()=>{
        setGraph(new Graph({
            container: ref.current,
            width: 800,
            height: 600,
            background: {
                color: '#fffbe6', // 设置画布背景颜色
            },
        }))
    },[])

    useEffect(()=>{
        if(!graph)return;
        const source = graph.addNode({
            x: 130,
            y: 30,
            width: 100,
            height: 40,
            attrs: {
                label: {
                    text: 'Hello',
                    fill: '#6a6c8a',
                },
                body: {
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                },
            },
        })
        const target = graph.addNode({
            x: 180,
            y: 160,
            width: 100,
            height: 40,
            attrs: {
                label: {
                    text: 'World',
                    fill: '#6a6c8a',
                },
                body: {
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                },
            },
        })
        graph.addEdge({ source, target })
        graph.centerContent()

        const dnd = new Addon.Dnd({
            target: graph,
            // scaled: false,
            // animation: true,
            // validateNode(droppingNode, options) {
            //     return droppingNode.shape === 'html'
            //         ? new Promise<boolean>((resolve) => {
            //             const { draggingNode, draggingGraph } = options
            //             const view = draggingGraph.findView(draggingNode)!
            //             const contentElem = view.findOne('foreignObject > body > div')
            //             Dom.addClass(contentElem, 'validating')
            //             setTimeout(() => {
            //                 Dom.removeClass(contentElem, 'validating')
            //                 resolve(true)
            //             }, 3000)
            //         })
            //         : true
            // },
        })
        setDnd(dnd)
    },[graph])

    const startDrag = function (e:any){
        const target = e.currentTarget
        const type = target.getAttribute('data-type')

        const node =
            type === 'rect'
                ? graph.createNode({
                    width: 100,
                    height: 40,
                    attrs: {
                        label: {
                            text: 'Rect',
                            fill: '#6a6c8a',
                        },
                        body: {
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                        },
                    },
                })
                : graph.createNode({
                    width: 60,
                    height: 60,
                    shape: 'html',
                    html: () => {
                        const wrap = document.createElement('div')
                        wrap.style.width = '100%'
                        wrap.style.height = '100%'
                        wrap.style.display = 'flex'
                        wrap.style.alignItems = 'center'
                        wrap.style.justifyContent = 'center'
                        wrap.style.border = '2px solid rgb(49, 208, 198)'
                        wrap.style.background = '#fff'
                        wrap.style.borderRadius = '100%'
                        wrap.innerText = 'Circle'
                        return wrap
                    },
                })

        dnd.start(node, e.nativeEvent as any)
    }

    return <div className="app">
        <div className="dnd-wrap">
            <div
                data-type="rect"
                className="dnd-rect"
                onMouseDown={startDrag}
            >
                Rect
            </div>
            <div
                data-type="circle"
                className="dnd-circle"
                onMouseDown={startDrag}
            >
                Circle
            </div>
        </div>

        <div className="app-content" ref={ref} />
    </div>
}

export default Test
