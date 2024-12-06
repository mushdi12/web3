package folder;

import dev.morphia.Datastore;
import dev.morphia.Morphia;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

import java.util.List;

public class MongoDBService {
    private Datastore datastore;

    /*
    public MongoDBService() {
        MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017"); // URL подключения
        Datastore datastore = Morphia.createDatastore(mongoClient, "java"); // укажите имя своей базы данных
        datastore.ensureIndexes(); // Обеспечиваем наличие индексов
    }

    public void savePointCheckResult(PointCheckResult result) {
        datastore.save(result);  // Сохранение объекта в MongoDB
    }

    public List<PointCheckResult> getAllResults() {
        return datastore.find(PointCheckResult.class).iterator().toList(); // Извлечение всех результатов
    }

     */
}
