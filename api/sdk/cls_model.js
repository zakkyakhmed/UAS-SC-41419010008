const tf = require('@tensorflow/tfjs-node');
var argmax = require( 'compute-argmax' );

function normalized(data){ // i & r
    i = (data[0] - 12.585) / 6.813882
    r = (data[1] - 51.4795) / 29.151289
    v = (data[1] - 650.4795) / 552.6351
    p = (data[1] - 10620.56) / 12152.78
    return [i, r, v, p]
}

function amax(res_arr){
    cls_data = []
    label = "Normal"
    for(i=0; i<res_arr.length; i++){
        cls_data[i] = res_arr[i]
    }
    console.log(argmax(cls_data), cls_data)

    if(argmax(cls_data) == 1){
        label = "Over Voltage"
    }
    if(argmax(cls_data) == 2){
        label = "Drop Voltage"
    }
    return label
}

async function classify(data){
    let in_dim = 4;
    
    data = normalized(data);
    shape = [1, in_dim];
    tf_data = tf.tensor2d(data, shape);

    try{
        console.log(tf_data)
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/zendi014/bot-jst/main/public/cls_model/model.json';
        const model = await tf.loadGraphModel(path);
        
        cls = model.predict(
                tf_data
        );

        result = cls.dataSync();
        return amax(result); 
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    classify: classify 
}
  
