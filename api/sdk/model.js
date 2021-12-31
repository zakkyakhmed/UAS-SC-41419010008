const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // x1 & x2 & x3
    x1 = (data[0] - 42.66179775) / 10.59592219
    x2 = (data[1] - 88.71235955) / 18.98517461
    x3 = (data[2] - 143.0393258) / 23.07779243
    return [x1, x2, x3]
}

function denormalized(data){
    y1 = (data[0] * 9.173413543) + 74.77191011
    y2 = (data[1] * 14.7892333) + 49.84044944
    y3 = (data[2] * 24.01464914) + 159.6988764
    return [y1, y2, y3]
}


async function predict(data){
    let in_dim = 3;
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/zakkyakhmed/UAS-SC-41419010008/main/public/ex_model/model.json';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return denormalized( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    predict: predict 
}
