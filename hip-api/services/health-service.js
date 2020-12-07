'use strict'

exports.getHealth = () => {
    return { 
        state: 'running', 
        api: 'down',
        db: 'down'
    }
}