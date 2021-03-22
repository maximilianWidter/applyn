package server.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import server.models.BewerbungsDokument;

@RepositoryRestResource

public interface BewerbungsDokumentRepository extends PagingAndSortingRepository<BewerbungsDokument, Long> {



}
