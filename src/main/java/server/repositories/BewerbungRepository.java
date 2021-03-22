package server.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import server.models.Bewerbung;

@RepositoryRestResource
public interface BewerbungRepository extends PagingAndSortingRepository<Bewerbung, Long> {

}
