package server.models;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class BewerbungsDokument extends Persistent {

    @NotBlank
    private String bewerbungsDokument_name;

    @Lob
    @NotBlank
    private String bewerbungsDokument_datei;

    @ManyToMany(mappedBy = "dokumente")
    private Set<Bewerbung> bewerbungen;

    @ManyToOne(optional = true)  // entspricht @NotNull bei gewöhnlichen Properties
    @CreatedBy
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getBewerbungsDokument_name() {
        return bewerbungsDokument_name;
    }

    public void setBewerbungsDokument_name(String bewerbungsDokument_name) {
        this.bewerbungsDokument_name = bewerbungsDokument_name;
    }

    public String getBewerbungsDokument_datei() {
        return bewerbungsDokument_datei;
    }

    public void setBewerbungsDokument_datei(String bewerbungsDokument_datei) {
        this.bewerbungsDokument_datei = bewerbungsDokument_datei;
    }
}