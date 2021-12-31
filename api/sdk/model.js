const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // x1 & x2 & x3
    x1 = (data[0] - 42.8622449) / 10.5729821
    x2 = (data[1] - 88.5989796) / 19.1055719
    x3 = (data[2] - 143.187755) / 22.889026
    return [x1, x2, x3]
}

function denormalized(data){
    y1 = (data[0] * 9.17854618) + 74.8071429
    y2 = (data[1] * 14.8205191) + 49.7959184
    y3 = (data[2] * 23.891744) + 160.082653
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
