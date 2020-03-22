package de.wvv.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A ProfessionalExperience.
 */
@Entity
@Table(name = "professional_experience")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProfessionalExperience implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "professional_experience")
    private String professionalExperience;

    @ManyToMany(mappedBy = "professionalExperiences")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<UserProfile> userProfiles = new HashSet<>();

    @ManyToMany(mappedBy = "professionalExperiences")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Offer> offers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProfessionalExperience() {
        return professionalExperience;
    }

    public ProfessionalExperience professionalExperience(String professionalExperience) {
        this.professionalExperience = professionalExperience;
        return this;
    }

    public void setProfessionalExperience(String professionalExperience) {
        this.professionalExperience = professionalExperience;
    }

    public Set<UserProfile> getUserProfiles() {
        return userProfiles;
    }

    public ProfessionalExperience userProfiles(Set<UserProfile> userProfiles) {
        this.userProfiles = userProfiles;
        return this;
    }

    public ProfessionalExperience addUserProfile(UserProfile userProfile) {
        this.userProfiles.add(userProfile);
        userProfile.getProfessionalExperiences().add(this);
        return this;
    }

    public ProfessionalExperience removeUserProfile(UserProfile userProfile) {
        this.userProfiles.remove(userProfile);
        userProfile.getProfessionalExperiences().remove(this);
        return this;
    }

    public void setUserProfiles(Set<UserProfile> userProfiles) {
        this.userProfiles = userProfiles;
    }

    public Set<Offer> getOffers() {
        return offers;
    }

    public ProfessionalExperience offers(Set<Offer> offers) {
        this.offers = offers;
        return this;
    }

    public ProfessionalExperience addOffer(Offer offer) {
        this.offers.add(offer);
        offer.getProfessionalExperiences().add(this);
        return this;
    }

    public ProfessionalExperience removeOffer(Offer offer) {
        this.offers.remove(offer);
        offer.getProfessionalExperiences().remove(this);
        return this;
    }

    public void setOffers(Set<Offer> offers) {
        this.offers = offers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProfessionalExperience)) {
            return false;
        }
        return id != null && id.equals(((ProfessionalExperience) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ProfessionalExperience{" +
            "id=" + getId() +
            ", professionalExperience='" + getProfessionalExperience() + "'" +
            "}";
    }
}
