package server.models;

import at.rennweg.htl.sew.autoconfig.UserInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import java.util.Set;

/**
 * @author F. Kasper, ferdinand.kasper@bildung.gv.at
 */

@Entity
public class User extends Persistent implements UserInfo {

    @NotBlank
    @Column(unique = true)
    private String username;

    @NotBlank
    private String displayName;

    @JsonIgnore
    private String password;

    @OneToMany(mappedBy = "user")
    private Set<BewerbungsDokument> bewerbungsDokumente;

    @OneToMany(mappedBy = "user")
    private Set<Bewerbung> bewerbung;

    @Column(columnDefinition = "boolean default false")
    private boolean admin;
    public boolean isAdmin() {
        return admin;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public void setUsername(String username) {
        this.username = (username != null) ? username.toLowerCase() : null;
    }


    @Override
    public String getDisplayName() {
        return displayName;
    }

    @Override
    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }


    @Override
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String pw) {
        if(pw == null){
            this.password = null;
        } else {
            this.password = new BCryptPasswordEncoder(12).encode(pw);
        }

    }

}
