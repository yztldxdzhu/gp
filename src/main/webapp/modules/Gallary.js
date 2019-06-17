/*
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import styles from '../public/styles/gallary.css';

import imgData from '../imgs.json';

// console.log(imgData);//[Object,Object,...]

let getImageUrl = (imageDataArr) => {
    for(let i = 0, len = imageDataArr.length; i < len; i++){
        let singleImageData = imageDataArr[i];
        singleImageData.imageURL = require ('../public/images/gallary/' + singleImageData.fileName);
        imageDataArr[i] = singleImageData;
    }
    return imageDataArr;
};

getImageUrl(imgData);
// console.log(getImageUrl(imgData));


function getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}


var ImageFigure = React.createClass({

    render: function () {

        // alert('render image');

        var styleObj = {};
        if(this.props.arrange.pos){
            styleObj = this.props.arrange.pos;
        }
        return(
            <figure className={styles.img_figure} style={styleObj}>
                <img src={this.props.data.imageURL} alt={this.props.data.title} width="100%" height="100%"/>
                <figcaption className={styles.img_figurecap}>
                    <h2 className={styles.img_title}>{this.props.data.title}</h2>
                </figcaption>
            </figure>
        )
    }
});


var Gallary = React.createClass({

    getInitialState: function () {
        alert('init state');

        return {
            imgsArrangeArr: [
                {
                    pos: {
                        left: 0,
                        top: 0
                    }
                }
            ]
        }
    },

    Constant: {
        centerPos: {
            left: 0,
            top: 0
        },
        hPosRange: {
            leftSecX: [0, 0],
            rightSecX: [0, 0],
            y: [0, 0]
        },
        vPosRange: {
            x: [0, 0],
            topY: [0, 0]
        }
    },

    rearrange: function (centerIndex) {

        alert('rearrange');

        console.log(this.state.imgsArrangeArr);

        var imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,

            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,

            vPosRangeX = vPosRange.x,
            vPosRangeTopY = vPosRange.topY,

            imgsArrangeTopArr = [],
            topImgNum = Math.ceil(Math.random() * 2),
            topImgSpliceIndex = 0,

            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);


        // 布局中间的图片
        imgsArrangeCenterArr[0].pos = centerPos;

        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        // 布局上方的 0 或 1 个图片
        imgsArrangeTopArr.forEach(function (value, index) {
            imgsArrangeTopArr[index].pos = {
                left: getRangeRandom(vPosRangeX[0], vPosRangeX[1]),
                top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1])
            }
        });

        // 布局左右两侧的图片
        for(var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++){
            var hPosRangeLORX = null;

            if(i < k){
                hPosRangeLORX = hPosRangeLeftSecX;
            }else{
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangeArr[i].pos = {
                left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1]),
                top: getRangeRandom(hPosRangeY[0], hPosRangeY[1])
            }
        }


        if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
            imgsArrangeArr.splice(topImgSpliceIndex, 0 , imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr: imgsArrangeArr
        })
    },
    componentDidMount: function () {

        alert('did');

        window.onload = function () {
            var stageDOM = this.refs['stage'],
                stageW = stageDOM.scrollWidth,
                stageH = stageDOM.scrollHeight,
                halfStageW = Math.ceil(stageW / 2),
                halfStageH = Math.ceil(stageH / 2);

            var imgDOM = this.refs.imageFigure0,
                imgW = imgDOM.scrollWidth,
                imgH = imgDOM.scrollHeight,
                halfImgW = Math.ceil(imgW / 2),
                halfImgH = Math.ceil(imgH / 2);

            console.log('stageW', stageW);
            console.log('stageH', stageH);
            console.log('halfStageW', halfStageW);
            console.log('halfStageH', halfStageH);

            console.log('imgW', imgW);
            console.log('imgH', imgH);
            console.log('halfImgW', halfImgW);
            console.log('halfImgH', halfImgH);



            this.Constant.centerPos = {
                left: halfStageW - halfImgW,
                top: halfStageH - halfImgH
            };

            this.Constant.hPosRange.leftSecX[0] = 0 - halfImgW;
            this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

            this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
            this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

            this.Constant.hPosRange.y[0] = 0 - halfImgH;
            this.Constant.hPosRange.y[1] = stageH - halfImgH;

            this.Constant.vPosRange.x[0] = halfStageW - imgW;
            this.Constant.vPosRange.x[1] = halfStageW;

            this.Constant.vPosRange.topY[0] = 0 - halfImgH;
            this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

            // alert('before rearrange(0)');

            this.rearrange(0);

            // alert('after rearrange(0)');
        }.bind(this)
    },
    imgClick: function () {
          alert('img click');
    },
    render: function () {
        alert('render');

        let imgFigures = [];
        let controllerUnits = [];

        imgData.forEach(((value, index) => {
            if(!this.state.imgsArrangeArr[index]){
                this.state.imgsArrangeArr[index] = {
                    pos : {
                        left: 0,
                        top: 0
                    }
                }
            }
            imgFigures.push(
                <ImageFigure
                    key={index}
                    data={value}
                    ref={"imageFigure" + index}
                    arrange={this.state.imgsArrangeArr[index]}
                    onClick={this.imgClick}
                />
            );

        }).bind(this));

        return(
            <section className={styles.stage} ref="stage">
                <section className={styles.img_sec} ref="hh">
                    {imgFigures}
                </section>
                <nav className={styles.controller_nav}>
                    {controllerUnits}
                </nav>
            </section>
        )
    }
});
export default Gallary;

*/