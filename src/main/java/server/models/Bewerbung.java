package server.models;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.Set;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class Bewerbung extends Persistent{

    @ManyToOne(optional = true)  // entspricht @NotNull bei gewöhnlichen Properties
    @CreatedBy
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @ManyToMany
    private Set<BewerbungsDokument> dokumente;

    public Set<BewerbungsDokument> getDokumente() {
        return dokumente;
    }

    public void setDokumente(Set<BewerbungsDokument> dokumente) {
        this.dokumente = dokumente;
    }

    @CreatedDate
    private Date bewerbung_erstellungsdatum;

    public Date getBewerbung_erstellungsdatum() {
        return bewerbung_erstellungsdatum;
    }

    public void setBewerbung_erstellungsdatum(Date bewerbung_erstellungsdatum) {
        this.bewerbung_erstellungsdatum = bewerbung_erstellungsdatum;
    }

    public Date getLastedit() {
        return lastedit;
    }

    public void setLastedit(Date lastedit) {
        this.lastedit = lastedit;
    }

    @LastModifiedDate
    private Date lastedit;

    private Date bewerbung_vondatum;

    public Date getBewerbung_vondatum() {
        return bewerbung_vondatum;
    }

    public void setBewerbung_vondatum(Date bewerbung_vondatum) {
        this.bewerbung_vondatum = bewerbung_vondatum;
    }

    public Date getBewerbung_bisdatum() {
        return bewerbung_bisdatum;
    }

    public void setBewerbung_bisdatum(Date bewerbung_bisdatum) {
        this.bewerbung_bisdatum = bewerbung_bisdatum;
    }

    private Date bewerbung_bisdatum;

    @NotBlank
    private String bewerbung_status;


    private String bewerbung_position;


    private String bewerbung_firmenName;


    private String bewerbung_firmenEmail;


    private String bewerbung_kontaktperson;


    private String bewerbung_notizen;

    public String getBewerbung_status() {
        return bewerbung_status;
    }

    public void setBewerbung_status(String bewerbung_status) {
        this.bewerbung_status = bewerbung_status;
    }

    public String getBewerbung_position() {
        return bewerbung_position;
    }

    public void setBewerbung_position(String bewerbung_position) {
        this.bewerbung_position = bewerbung_position;
    }

    public String getBewerbung_firmenName() {
        return bewerbung_firmenName;
    }

    public void setBewerbung_firmenName(String bewerbung_firmenName) {
        this.bewerbung_firmenName = bewerbung_firmenName;
    }

    public String getBewerbung_firmenEmail() {
        return bewerbung_firmenEmail;
    }

    public void setBewerbung_firmenEmail(String bewerbung_firmenEmail) {
        this.bewerbung_firmenEmail = bewerbung_firmenEmail;
    }

    public String getBewerbung_kontaktperson() {
        return bewerbung_kontaktperson;
    }

    public void setBewerbung_kontaktperson(String bewerbung_kontaktperson) {
        this.bewerbung_kontaktperson = bewerbung_kontaktperson;
    }

    public String getBewerbung_notizen() {
        return bewerbung_notizen;
    }

    public void setBewerbung_notizen(String bewerbung_notizen) {
        this.bewerbung_notizen = bewerbung_notizen;
    }
}
