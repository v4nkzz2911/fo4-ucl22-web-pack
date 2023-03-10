import common from './common'
import devOpts from './dev'
import productOpts from './product'

let opts = __DEV__ ? devOpts : productOpts

export default {
    ...common,
    ...opts
}