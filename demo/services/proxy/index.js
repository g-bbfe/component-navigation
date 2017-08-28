
import Conf from './config';
import DataSource from 'data-source-proxy';

var baseURL = Conf.BASE_URL;

var dataSource = new DataSource();

// 面向切面: 按顺序组装拦截器
import fixParamsInterceptor from './interceptors/FixParams';
import errorProcessorInterceptor from './interceptors/ErrorProcessor';

dataSource
    .interceptors.request.use(fixParamsInterceptor.request)
    .interceptors.error.use(errorProcessorInterceptor.error)

var DataSourceProxy = {

    post: function(uri, data) {
        var config = {
            url: uri,
            method: 'post',
            // to methods of that instance.
            baseURL: baseURL,
            // data仅用于post请求， 放在http请求体中
            data: data
        };

        return DataSourceProxy.request(config);

    },

    get: function(uri, params) {

        var config = {
            url: uri,
            // to methods of that instance.
            baseURL: baseURL,
            method: 'get',
            // params仅用于get请求， 会拼接在url后面
            params: params,
            // 默认get请求可合并
            comboRequestEnabled: true
        };

        return DataSourceProxy.request(config);
    },

    cacheFirstGet: function(uri, params, { maxAge, ignoreExpires } = { maxAge: 60 * 60 * 1000, ignoreExpires: false }) {
        var config = {
            url: uri,
            // to methods of that instance.
            baseURL: baseURL,
            method: 'get',
            // params仅用于get请求， 会拼接在url后面
            params: params,
            // 默认get请求可合并
            comboRequestEnabled: true,
            // ============= 新增缓存数据参数  ============
            // [Number|null] 缓存时间， 单位ms. 如果需要缓存 ，请给maxAge 赋一个数值
            maxAge: maxAge,
            // [Boolean] 是否忽略缓存过期
            ignoreExpires: ignoreExpires
        };

        return DataSourceProxy.request(config);
    },

    // let {url, baseURL, method, params, comboRequestEnabled, maxAge, ignoreExpires} = config
    request: function(config) {
        return new Promise((resolve, reject) => {
            dataSource.request(config)
                .then(data => { resolve(data) }, err => { reject(err); })
        });            

    },
    start: () => {
        dataSource.start();
    },
    stop: () => {
        dataSource.stop();
    }

}


// 错误类型的定义
DataSourceProxy.ErrorType = DataSource.ErrorType; //{BUSINESS, NETWORK, TIMEOUT, ABORT, PARSER}
DataSourceProxy.createError = DataSource.createError; //{BUSINESS, NETWORK, TIMEOUT, ABORT, PARSER}

export default DataSourceProxy;
