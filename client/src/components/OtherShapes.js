import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Pack, Partition, Pie } from "@potion/layout";
import { Svg, Rect, Arc } from "@potion/element";
import Group from '@potion/element/lib/Group';

const OtherShapes = props => {

    const [colorList, setColorList] = useState([]);
    const [blocksData, setBlocksData] = useState([]);

    useEffect(() => {
        axiosWithAuth()
        .get('/colors')
        .then(res => {
            console.log(res);
            setColorList(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    
    useEffect(() => {
    const generateBlocksData = colorList.map((_, i) => ({
      value: Math.floor(Math.random() * (colorList.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBlocksData(generateBlocksData);
  }, [colorList]);

    const handleClick = e => {
        props.history.push('/bubbles');
    }
    
    return (
        <div>
             <h2>Other Examples</h2>
            <button onClick={handleClick}>back to bubbles</button>
           
            <div className='blocks-display'>
                <div>
                    <p>Pack Rectangles</p>
                    <Svg width={400} height={400}>

                        <Pack
                        data={{
                            children: blocksData
                        }}
                        sum={datum => datum.value}
                        size={[400, 400]}
                        includeRoot={false}
                        nodeEnter={d => ({ ...d, r: 0 })}
                        animate
                        >
                        {nodes =>
                            nodes
                            .map(({ x, y, r, key }, i) => {
                                if (i < colorList.length) {
                                return (
                                    <Rect
                                    key={key}
                                    x={x}
                                    y={y}
                                    width={r}
                                    height={r}
                                    fill={colorList[i].code.hex}
                                    />
                                );
                                }
                                return null;
                            })
                            .filter(v => v)
                        }
                        </Pack>
                    </Svg>
                </div>
                

                <div>
                    <p>Partition</p>
                    <Svg width={400} height={200}>

                        <Partition
                        data={{
                            children: blocksData
                        }}
                        sum={datum => datum.value}
                        size={[400, 200]}
                        includeRoot={false}
                        nodeEnter={d => ({ ...d, r: 0 })}
                        animate
                        >
                        {nodes =>
                            nodes
                            .map(({ x0, y0, x1, y1, key }, i) => {
                                if (i < colorList.length) {
                                return (
                                    <Rect
                                    key={key}
                                    x={x0}
                                    y={y0}
                                    width={x1- x0}
                                    height={y1 -y0}
                                    fill={colorList[i].code.hex}
                                    />
                                );
                                }
                                return null;
                            })
                            .filter(v => v)
                        }
                        </Partition>

                    </Svg>
                </div>
      
            </div>            
        </div>
    );    
    
}

export default OtherShapes;