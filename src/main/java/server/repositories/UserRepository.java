package server.repositories;

import at.rennweg.htl.sew.autoconfig.UserInfoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import server.models.User;

/**
 * @author F. Kasper, ferdinand.kasper@bildung.gv.at
 */
@RepositoryRestResource
public interface UserRepository extends UserInfoRepository<User> {

}
