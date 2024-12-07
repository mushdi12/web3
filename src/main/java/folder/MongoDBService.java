package folder;

import dev.morphia.Datastore;
import dev.morphia.Morphia;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.bson.Document;

public class MongoDBService {

    private final MongoClient mongoClient = MongoClients.create("mongodb://mongodb:27017");

    private final Datastore datastore = Morphia.createDatastore(mongoClient, "java");

    void saveToDB(double x, double y, double r, String verdict) {
        PointEntity point = new PointEntity(x, y, r, verdict);
        datastore.save(point);
    }

    void clearDB() {
        datastore.getCollection(PointEntity.class).deleteMany(new Document());
    }


}
