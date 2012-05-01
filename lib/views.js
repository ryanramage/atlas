

exports.points = {
    map : function(doc) {
        if (doc.geometry) {
            emit(doc.geometry, [doc._id,doc.geometry]);
        }
    }
}

